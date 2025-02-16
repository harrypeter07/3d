class Loader {
    constructor() {
        this.progress = 0;
        this.total = 100;
        this.progressBar = document.querySelector('.progress');
        this.loaderElement = document.querySelector('.loader');
    }

    update(progress) {
        this.progress = Math.min(progress, 100);
        this.progressBar.style.width = `${this.progress}%`;

        if (this.progress >= 100) {
            setTimeout(() => {
                this.hide();
            }, 500);
        }
    }

    hide() {
        gsap.to(this.loaderElement, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                this.loaderElement.style.display = 'none';
            }
        });
    }
}

const loader = new Loader();
