// ข้อมูลคำถาม
const questions = [
    {question:"การเรียนรู้แบบ Interactive คืออะไร?", options:["การเรียนแบบมีปฏิสัมพันธ์","การเรียนแบบท่องจำ","การเรียนแบบฟัง","การเรียนแบบอ่าน"], correct:0, icon:"🤔"},
    {question:"ข้อดีของวิดีโอ Interactive คืออะไร?", options:["ดูง่าย","เพิ่มการมีส่วนร่วมและความจดจำ","สั้น","ฟรี"], correct:1, icon:"💡"},
    {question:"เทคโนโลยีใดที่ใช้สร้างวิดีโอ Interactive?", options:["HTML เท่านั้น","CSS เท่านั้น","HTML, CSS และ JavaScript","JavaScript เท่านั้น"], correct:2, icon:"💻"},
    {question:"องค์ประกอบสำคัญของวิดีโอ Interactive คืออะไร?", options:["เสียงเพลงเท่านั้น","ภาพสวยเท่านั้น","คำถาม ปุ่มกด และการตอบสนอง","ความยาวของวิดีโอ"], correct:2, icon:"🎯"},
    {question:"การใช้วิดีโอ Interactive เหมาะกับการเรียนรู้แบบใด?", options:["การเรียนรู้แบบเดิม","การเรียนรู้แบบ Active Learning","การเรียนรู้แบบท่องจำ","การเรียนรู้แบบฟังเท่านั้น"], correct:1, icon:"🚀"}
];

let currentQuestion = 0;
let score = 0;
let totalQuestions = questions.length;
let videoDuration = 180; // วินาที 3 นาที
let videoInterval;

// YouTube Player
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

let player;
function onYouTubeIframeAPIReady(){
    player = new YT.Player('videoArea', {
        height: '400',
        width: '100%',
        videoId: 'sR4D-pnU9T8',
        playerVars: { autoplay: 0, controls:0, modestbranding:1, rel:0 },
        events:{ onReady:()=>{} }
    });
}

// เริ่มเล่น
function startVideo(){
    if(player){ player.playVideo(); startVideoProgress(); }
}

function pauseVideo(){ if(player) player.pauseVideo(); }
function resumeVideo(){ if(player){ player.playVideo(); hideQuestion(); } }

function resetVideo(){
    if(player) player.stopVideo();
    currentQuestion = 0; score=0;
    updateScore(); updateProgress(0);
    hideQuestion();
}

// คำถาม
function showQuestion(){
    if(currentQuestion<totalQuestions){
        const q=questions[currentQuestion];
        const overlay=document.getElementById('questionOverlay');
        document.getElementById('questionIcon').textContent=q.icon;
        document.getElementById('questionText').textContent=q.question;
        document.getElementById('questionCounter').textContent=`คำถามที่ ${currentQuestion+1} จาก ${totalQuestions}`;
        const optionsContainer=document.getElementById('answerOptions');
        optionsContainer.innerHTML='';
        q.options.forEach((option,index)=>{
            let btn=document.createElement('button');
            btn.textContent=option;
            btn.onclick=()=>selectAnswer(index);
            optionsContainer.appendChild(btn);
        });
        overlay.classList.add('active');
    }
}
function hideQuestion(){ document.getElementById('questionOverlay').classList.remove('active'); }

function selectAnswer(selectedIndex){
    const q=questions[currentQuestion];
    const buttons=document.querySelectorAll('#answerOptions button');
    buttons.forEach((btn,i)=>{
        btn.disabled=true;
        if(i===q.correct) btn.classList.add('correct');
        else if(i===selectedIndex) btn.classList.add('incorrect');
    });
    if(selectedIndex===q.correct) score++;
    updateScore();
    setTimeout(()=>{
        currentQuestion++;
        hideQuestion();
        if(currentQuestion<totalQuestions) resumeVideo();
        else completeVideo();
    },2000);
}

// Progress
function startVideoProgress(){
    clearInterval(videoInterval);
    videoInterval=setInterval(()=>{
        if(player && player.getPlayerState()===YT.PlayerState.PLAYING){
            let currentTime=player.getCurrentTime();
            let percent=(currentTime/videoDuration)*100;
            updateProgress(percent);
            if(percent>=20 && currentQuestion===0){ pauseVideo(); showQuestion(); }
            else if(percent>=35 && currentQuestion===1){ pauseVideo(); showQuestion(); }
            else if(percent>=50 && currentQuestion===2){ pauseVideo(); showQuestion(); }
            else if(percent>=70 && currentQuestion===3){ pauseVideo(); showQuestion(); }
            else if(percent>=85 && currentQuestion===4){ pauseVideo(); show
