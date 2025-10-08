// ข้อมูลคำถาม
const questions = [
    {
        question: "การเรียนรู้แบบ Interactive คืออะไร?",
        options: ["การเรียนแบบมีปฏิสัมพันธ์","การเรียนแบบท่องจำ","การเรียนแบบฟัง","การเรียนแบบอ่าน"],
        correct: 0,
        icon: "🤔"
    },
    {
        question: "ข้อดีของวิดีโอ Interactive คืออะไร?",
        options: ["ดูง่าย","เพิ่มการมีส่วนร่วมและความจดจำ","สั้น","ฟรี"],
        correct: 1,
        icon: "💡"
    },
    {
        question: "เทคโนโลยีใดที่ใช้สร้างวิดีโอ Interactive?",
        options: ["HTML เท่านั้น","CSS เท่านั้น","HTML, CSS และ JavaScript","JavaScript เท่านั้น"],
        correct: 2,
        icon: "💻"
    },
    {
        question: "องค์ประกอบสำคัญของวิดีโอ Interactive คืออะไร?",
        options: ["เสียงเพลงเท่านั้น","ภาพสวยเท่านั้น","คำถาม ปุ่มกด และการตอบสนอง","ความยาวของวิดีโอ"],
        correct: 2,
        icon: "🎯"
    },
    {
        question: "การใช้วิดีโอ Interactive เหมาะกับการเรียนรู้แบบใด?",
        options: ["การเรียนรู้แบบเดิม","การเรียนรู้แบบ Active Learning","การเรียนรู้แบบท่องจำ","การเรียนรู้แบบฟังเท่านั้น"],
        correct: 1,
        icon: "🚀"
    }
];

let currentQuestion = 0;
let score = 0;
let totalQuestions = questions.length;
let videoProgress = 0;
let isVideoPlaying = false;
let videoInterval;

function startVideo() {
    document.getElementById('videoArea').innerHTML = `
        <iframe id="actualVideo" class="w-full h-full" 
            src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" 
            frameborder="0" allowfullscreen>
        </iframe>
    `;
    isVideoPlaying = true;
    startVideoProgress();
}

function startVideoProgress() {
    videoInterval = setInterval(() => {
        if (isVideoPlaying && videoProgress < 100) {
            videoProgress += 1;
            updateProgress();
            // แสดงคำถามตามช่วงเวลา
            if (videoProgress === 20 && currentQuestion === 0) { pauseVideo(); showQuestion(); }
            if (videoProgress === 35 && currentQuestion === 1) { pauseVideo(); showQuestion(); }
            if (videoProgress === 50 && currentQuestion === 2) { pauseVideo(); showQuestion(); }
            if (videoProgress === 70 && currentQuestion === 3) { pauseVideo(); showQuestion(); }
            if (videoProgress === 85 && currentQuestion === 4) { pauseVideo(); showQuestion(); }
            if (videoProgress === 100) { completeVideo(); }
        }
    }, 150);
}

function pauseVideo() { isVideoPlaying = false; }
function resumeVideo() { if(videoProgress<100){isVideoPlaying=true; hideQuestion();} }

function showQuestion() {
    if (currentQuestion < totalQuestions) {
        const q = questions[currentQuestion];
        document.getElementById('questionIcon').textContent = q.icon;
        document.getElementById('questionText').textContent = q.question;
        document.getElementById('questionCounter').textContent = `คำถามที่ ${currentQuestion+1} จาก ${totalQuestions}`;
        const optionsContainer = document.getElementById('answerOptions');
        optionsContainer.innerHTML = '';
        q.options.forEach((option,index)=>{
            const btn = document.createElement('button');
            btn.className = 'answer-btn w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium text-left';
            btn.textContent = option;
            btn.onclick = ()=>selectAnswer(index);
            optionsContainer.appendChild(btn);
        });
        document.getElementById('questionOverlay').classList.add('active');
    }
}

function hideQuestion() { document.getElementById('questionOverlay').classList.remove('active'); }

function selectAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((btn,index)=>{
        if(index===q.correct){ btn.className='answer-btn w-full correct text-white py-3 px-4 rounded-lg font-medium text-left'; }
        else if(index===selectedIndex && index!==q.correct){ btn.className='answer-btn w-full incorrect text-white py-3 px-4 rounded-lg font-medium text-left'; }
        else { btn.className='answer-btn w-full bg-gray-300 text-gray-600 py-3 px-4 rounded-lg font-medium text-left'; }
        btn.disabled=true;
    });
    if(selectedIndex===q.correct){score++;}
    updateScore();
    setTimeout(()=>{
        currentQuestion++;
        hideQuestion();
        if(currentQuestion<totalQuestions){ resumeVideo(); }
        else{ completeVideo(); }
    },2000);
}

function updateProgress() {
    document.getElementById('progressBar').style.width = videoProgress+'%';
    document.getElementById('progressText').textContent=Math.round(videoProgress)+'%';
}

function updateScore() { document.getElementById('scoreDisplay').textContent = `${score}/${currentQuestion+1}`; }

function completeVideo() {
    isVideoPlaying=false;
    clearInterval(videoInterval);
    videoProgress=100;
    updateProgress();
    document.getElementById('videoArea').innerHTML=`
        <div class="video-placeholder w-full h-full">
            <div class="text-center">
                <div class="text-6xl mb-4">🎉</div>
                <p class="text-2xl mb-4">เรียนจบแล้ว!</p>
                <div class="text-lg mb-4">คะแนนของคุณ: ${score}/${totalQuestions}</div>
                <div class="text-lg">${score===totalQuestions?'ยอดเยี่ยม! 🏆':score>=totalQuestions/2?'ดีมาก! 👍':'ลองใหม่นะ! 💪'}</div>
            </div>
        </div>
    `;
}

function resetVideo() {
    clearInterval(videoInterval);
    currentQuestion=0; score=0; videoProgress=0; isVideoPlaying=false;
    updateProgress(); updateScore(); hideQuestion();
    document.getElementById('videoArea').innerHTML=`
        <div class="video-placeholder w-full h-full">
            <div class="text-center">
                <div class="text-6xl mb-4">🎥</div>
                <p class="mb-4">วิดีโอจะแสดงที่นี่</p>
                <button class="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors" onclick="startVideo()">
                    ▶️ เริ่มเรียน
                </button>
            </div>
        </div>
    `;
}

// เริ่มต้นคะแนน 0
updateScore();
