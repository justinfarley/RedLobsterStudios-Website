    document.addEventListener('DOMContentLoaded', function() {

        const navbarLinks = document.querySelectorAll('a'); //all links
        navbarLinks.forEach(link => {
            if(link.getAttribute('href').substring(0, 1) == '#'){
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        });

        const headerText = document.getElementById('newest-content-header-text');
        const colors = ['#c30010', '#f94449', '#ff0000'];
        let colorIndex = 0;

        function fadeToColor(startColor, endColor, duration) {
            let startTime = null;
            function animate(currentTime) {
                if (!startTime) startTime = currentTime;
                const progress = (currentTime - startTime) / duration;

                if (progress < 1) {
                    const r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
                    const g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
                    const b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);
                    headerText.style.color = `rgb(${r}, ${g}, ${b})`;
                    requestAnimationFrame(animate);
                } else {
                    headerText.style.color = `rgb(${endColor.r}, ${endColor.g}, ${endColor.b})`;
                    colorIndex = (colorIndex + 1) % colors.length;
                    setTimeout(changeColor, 250);
                }
            }
            requestAnimationFrame(animate);
        }

        function changeColor() {
            const startColor = hexToRgb(colors[colorIndex]);
            const endColor = hexToRgb(colors[(colorIndex + 1) % colors.length]);
            fadeToColor(startColor, endColor, 250);
        }

        function hexToRgb(hex) {
            const bigint = parseInt(hex.slice(1), 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        }

        changeColor();

        let secretCode = '';
        const targetCode = 'redlobsterstudios';

        document.addEventListener('keydown', function(e) {
            secretCode += e.key.toLowerCase();
            if (secretCode.length > targetCode.length) {
                secretCode = secretCode.slice(-targetCode.length);
            }
            if (secretCode === targetCode) {
                funStuffHappens();
            }
        });

        function funStuffHappens() {
            headerText.style.fontSize = '5em';
            headerText.style.transition = 'font-size 1s ease-in-out';
            
            for (let i = 0; i < 20; i++) {
                createFallingLobster();
            }

            // Reset after 5 seconds
            setTimeout(() => {
                document.body.style.animation = '';
                headerText.style.fontSize = '';
                document.querySelectorAll('.falling-lobster').forEach(el => el.remove());
            }, 20000);
        }

        function createFallingLobster() {
            const lobster = document.createElement('div');
            lobster.className = 'falling-lobster';
            lobster.style.left = `${Math.random() * 100}vw`;
            lobster.style.animationDuration = `${Math.random() * 2 + 3}s`;
            lobster.innerHTML = '🦞';
            lobster.style.animation = `fall linear infinite ${Math.random() * 2 + 3}s, rotate linear infinite ${Math.random() * 2 + 1}s`;
            document.body.appendChild(lobster);
        }
    });