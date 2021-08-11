/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let isSliding = false;
/* Build out functions */

function togglePlay(){
    if(video.paused){
        video.play();
    } else{
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
    console.log('Update the button');
}

function skip() {
    console.log('Skipping');
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    if(!isSliding){
        return;
    }
    console.log(this.value);
}


/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mouseup',() => isSliding = false));
ranges.forEach(range => range.addEventListener('mousedown',() => isSliding = true));
ranges.forEach(range => range.addEventListener('mouseout',() => isSliding = false));
