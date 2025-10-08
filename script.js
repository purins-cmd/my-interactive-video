let player;
const videoDuration = 180; // 3 นาที = 180 วินาที
let videoInterval;
let questions = [
    { time: 20, question: "การเรียนรู้แบบ Interactive คืออะไร?", options:["การเรียนแบบมีปฏิสัมพันธ์","การเรียนแบบท่องจำ","การเรียนแบบฟัง","การเรียนแบบอ่าน"], correct:0, icon:"🤔" },
    { time: 50, question: "ข้อดีของวิดีโอ Interactive คืออะไร?", options:["ดูง่าย","เพิ่มการมีส่วนร่วมและความจดจำ","สั้น","ฟรี"], correct:1, icon:"💡" },
    { time: 90, question: "เทคโนโลยีใดที่ใช้สร้างวิดีโอ Interactive?", options:["HTML เท่านั้น","CSS เท่านั้น","HTML, CSS และ JavaScript","JavaScript เท่านั้น"], correct:2, icon:"💻" },
    { time: 130, question: "องค์ประกอบสำคัญของวิดีโอ Interactive คืออะไร?", options:["เสียงเพลงเท่านั้น","ภาพสวยเท่านั้น","คำถาม ปุ่มกด และการตอบสนอง","ความยาวของวิดีโอ"], correct:2, icon:"🎯" },
    { time: 160, question: "การใช้วิดีโอ Interactive เหมาะกับการเรียนรู้แบบใด?", options:["การเรียนรู้แบบเดิม","การเรียนรู้แบบ Active Learning","การเรียนรู้แบบท่องจำ","การเรียนรู้แบบฟังเท่านั้น"], correct:1, icon:"🚀" },
];

let currentQuestion = 0;
let score = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoArea', {
        height: '100%',
        width: '100%',
        videoId: 'sR4D-pnU9T8',
        playerVars: { 'autoplay': 1, 'controls': 0, 'rel': 0 },
        events: { 'onReady': onPlayerReady }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    startProgress();
}

function startProgress() {
    videoInterval = setInterval(() => {
        if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            const currentTime = player.getCurrentTime();
            const percent = (currentTime / videoDuration) * 100;
            document.getElementById('progressBar').style.width = percent + '%';
            document.getElementById('progressText').textContent = Math.round(percent) + '%';

            // แสดงคำถามตามเวลา
            if(currentQuestion < questions.length && currentTime >= questions[currentQuestion].time){
                pauseVideo();
                showQuestion(questions[currentQuestion]);
                currentQuestion++;
            }
        }
    }, 500);
}

function pauseVideo() {
    if(player) player.pauseVideo();
}

function resumeVideo() {
    if(player) player.playVideo();
    hideQuestion();
}

function showQuestion(q) {
    const overlay = document.getElementById('questionOverlay');
    overlay.classList.add('active');
    document.getElementById('questionIcon').textContent = q.icon;
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('questionCounter').textContent = `คำถามที่ ${currentQuestion} จาก ${questions.length}`;

    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, idx)=>{
        const btn = document.createElement('button');
        btn.className = 'answer-btn bg-gray-100 hover:bg-gray-200 text-gray-800';
        btn.textContent = opt;
        btn.onclick = ()=>{
            if(idx===q.correct) score++;
            updateScore();
            Array.from(optionsContainer.children).forEach(b=>{
                b.disabled = true;
                if(b===btn && idx===q.correct) b.classList.add('correct');
                if(b===btn && idx!==q.correct) b.classList.add('incorrect');
            });
            setTimeout(resumeVideo, 1500);
        };
        optionsContainer.appendChild(btn);
    });
}

function hideQuestion() {
    document.getElementById('questionOverlay').classList.remove('active');
}

function updateScore() {
    document.getElementById('scoreDisplay').textContent = `${score}/${currentQuestion}`;
}
