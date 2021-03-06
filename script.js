/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

console.log(fullscreen)

let isSliding = false;
/* Build out functions */

function togglePlay(){
    if(video.paused){
        video.play();
    } else{
        video.pause();
    }
}

fullscreen.textContent = "[ ]";

function updateButton(){
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
    console.log('Update the button');
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    if(!isSliding){
        return;
    }
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime/video.duration)* 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    console.log(e);
    const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
}

function toggleFullscreen(e){
    if(!(document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement)){
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.webkitRequestFullscreen) { 
            elem.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) { 
            elem.msRequestFullscreen();
        }
        fullscreen.textContent = "[]";
    }else{
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (docuement.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
    }
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mouseup',() => isSliding = false));
ranges.forEach(range => range.addEventListener('mousedown',() => isSliding = true));
ranges.forEach(range => range.addEventListener('mouseout',() => isSliding = false));

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown',() => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullscreen.addEventListener('click', toggleFullscreen)