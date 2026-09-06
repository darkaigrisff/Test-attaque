"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const feed = document.getElementById("feed");

    const pages = document.querySelectorAll(".video-page");

    const videos = document.querySelectorAll(".video");


    console.log("🎮 GAME ZONE");
    console.log("Vidéos trouvées :", videos.length);


    /* =========================
       CONFIGURATION VIDÉOS
    ========================= */

    videos.forEach((video, index) => {

        console.log(
            "Vidéo " + (index + 1) + " :",
            video.getAttribute("src")
        );


        /*
         * Chargement
         */

        video.load();


        /*
         * Vidéo prête
         */

        video.addEventListener("loadedmetadata", () => {

            console.log(
                "✅ Vidéo chargée :",
                video.src
            );

            console.log(
                "Durée :",
                video.duration
            );

            console.log(
                "Dimensions :",
                video.videoWidth,
                "x",
                video.videoHeight
            );
        });


        /*
         * Erreur
         */

        video.addEventListener("error", () => {

            console.error(
                "❌ ERREUR VIDÉO :",
                video.src
            );

            if (video.error) {

                console.error(
                    "Code erreur :",
                    video.error.code
                );

                console.error(
                    "Message :",
                    video.error.message
                );
            }
        });


        /*
         * Clic sur vidéo
         *
         * Lecture / pause
         */

        video.addEventListener("click", () => {

            if (video.paused) {

                video.play().catch((error) => {

                    console.error(
                        "Impossible de lire :",
                        error
                    );

                });

            } else {

                video.pause();

            }

        });

    });


    /* =========================
       LIKE
    ========================= */

    document.querySelectorAll(".like").forEach((button) => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const number =
                button.querySelector("span");

            let count =
                Number(number.textContent);

            const alreadyLiked =
                button.dataset.liked === "true";


            if (alreadyLiked) {

                count--;

                button.dataset.liked = "false";

                button.style.transform = "scale(1)";

            } else {

                count++;

                button.dataset.liked = "true";

                button.style.transform = "scale(1.15)";

            }


            number.textContent = count;

        });

    });


    /* =========================
       SON
    ========================= */

    document.querySelectorAll(".sound").forEach((button, index) => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const video = videos[index];

            video.muted = !video.muted;


            if (video.muted) {

                button.textContent = "🔇";

            } else {

                button.textContent = "🔊";

            }

        });

    });


    /* =========================
       AUTOPLAY AU SCROLL
    ========================= */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    const video =
                        entry.target.querySelector(".video");


                    if (!video) {
                        return;
                    }


                    if (entry.isIntersecting) {

                        /*
                         * La vidéo visible démarre.
                         */

                        video.play().catch(() => {

                            /*
                             * Certains navigateurs
                             * bloquent l'autoplay.
                             *
                             * Elle pourra toujours
                             * être lancée avec un clic.
                             */

                        });

                    } else {

                        /*
                         * Les autres vidéos s'arrêtent.
                         */

                        video.pause();

                    }

                });

            },
            {
                threshold: 0.7
            }
        );


    pages.forEach((page) => {

        observer.observe(page);

    });


    /* =========================
       PREMIÈRE VIDÉO
    ========================= */

    if (videos.length > 0) {

        videos[0].muted = true;

        videos[0].play().catch(() => {

            console.log(
                "Autoplay bloqué : appuie sur la vidéo."
            );

        });

    }

});