// ==================================================
// SDK をインポートして生成モデルを初期化する
//https://ai.google.dev/gemini-api/docs/get-started/tutorial?hl=ja&lang=web#initialize-model
// ==================================================

import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch your API_KEY
const API_KEY = "***";
// Reminder: This should only be for local testing

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

console.log('Generative AI model initialized');


// ==================================================
// Firebaseからユーザーデータを取り込む
// ==================================================

let userInfo;

$(document).ready(function() {
    const uniqueId = localStorage.getItem('uniqueId');
    const uniqueRef = ref(db, "users/" + uniqueId); // Firebase Realtime Databaseの参照を取得
    
    // データを取得するためにget()を使う
    get(uniqueRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val(); // ユーザーデータ全体を取得

            // 配列が存在する場合の処理
            const nationalities = userData.nationalities ? userData.nationalities.join(", ") : "データがありません";
            const residences = userData.residences ? userData.residences.join(", ") : "データがありません";
            const visas = userData.visas ? userData.visas.join(", ") : "データがありません";
            const jobs = userData.jobs ? userData.jobs.join(", ") : "データがありません";

            let userInfo = `このユーザーのデータは下記です。
            国籍：${nationalities}
            居住国：${residences}
            ビザの種類：${visas}
            職業：${jobs}`;

            // ここでuserInfoを適切な場所に表示する
            console.log(userInfo); // デバッグ用
        } else {
            console.log("データが存在しません");
        }
    }).catch((error) => {
        console.error("ユーザー情報をうまく読み込めませんでした。");
    });
});


// ==================================================
// テキストのみの入力からテキストを生成する
// https://ai.google.dev/gemini-api/docs/get-started/tutorial?hl=ja&lang=web#generate-text-from-text-input
// ==================================================

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  //納税国の判断---------------------------------------------
  const countryPrompt = "下記の情報を読み取って、納税地の観点からこの人の納税国を判断してください。余計な文章はつけず国名のみ返答してくだい。例）日本、カナダ" + "私は365日東京に住んでいます"
  const countryResult = await model.generateContent(countryPrompt);
  const countryResponse = await countryResult.response;
  let countryText = countryResponse.text();
  $("#country-result").html(countryText);

  //居住地の判断---------------------------------------------
  const residencePrompt = "下記の情報を読み取って、納税地の観点からこの人の居住地を判断してください。レスポンスの文章をそのままHTMLに貼り付けたら見た目が綺麗になるように、改行なども気をつけて250文字程度で返答してください" + "私は365日東京に住んでいます"
  const residenceResult = await model.generateContent(residencePrompt);
  const residenceResponse = await residenceResult.response;
  let residenceText = residenceResponse.text();
  // **で囲まれた部分を<strong>タグに変換
  residenceText = residenceText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  $("#residence-judge").html(residenceText);
  

  //収入の判断---------------------------------------------
  const incomePrompt = "下記の情報を読み取って、納税地の観点からこの人の居住地を判断してください。レスポンスの文章をそのままHTMLに貼り付けたら見た目が綺麗になるように、改行なども気をつけて250文字程度で返答してください" + "私は365日東京に住んでいます"
  const incomeResult = await model.generateContent(incomePrompt);
  const incomeResponse = await incomeResult.response;
  let incomeText = incomeResponse.text();
  // **で囲まれた部分を<strong>タグに変換
  incomeText = incomeText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  $("#income-judge").html(incomeText);


  //収入の判断---------------------------------------------
  const assetsPrompt = "下記の情報を読み取って、納税地の観点からこの人の居住地を判断してください。レスポンスの文章をそのままHTMLに貼り付けたら見た目が綺麗になるように、改行なども気をつけて250文字程度で返答してください" + "私は365日東京に住んでいます"
  const assetsResult = await model.generateContent(assetsPrompt);
  const assetsResponse = await assetsResult.response;
  let assetsText = assetsResponse.text();
  // **で囲まれた部分を<strong>タグに変換
  assetsText = assetsText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  $("#assets-judge").html(assetsText);

  //今後の対応のアドバイス---------------------------------------------
  const advicePrompt = "あなたはグローバルの納税事情に詳しいプロの税理士です。下記の情報を読み取って、この人が今年の納税をどこにどうすればいいか、初心者にもわかりやすく400文字程度でアドバイスしてください。レスポンスの文章をそのままHTMLに貼り付けたら見た目が綺麗になるように、改行なども気をつけて返答してください" + "私は365日東京に住んでいます"
  const adviceResult = await model.generateContent(advicePrompt);
  const adviceResponse = await adviceResult.response;
  let adviceText = adviceResponse.text();
  // **で囲まれた部分を<strong>タグに変換
  adviceText = adviceText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  $("#must").html(adviceText);

  //日本の税務上の注意点---------------------------------------------
  const cautionPrompt = "あなたはグローバルの納税事情に詳しいプロの税理士です。下記の情報を読み取って、この人が今年の納税を行うにあたり日本の税務上の注意点として考えられることを、初心者にもわかりやすく400文字程度でアドバイスしてください。レスポンスの文章をそのままHTMLに貼り付けたら見た目が綺麗になるように、改行なども気をつけて返答してください" + "私は365日東京に住んでいます"
  const cautionResult = await model.generateContent(cautionPrompt);
  const cautionResponse = await cautionResult.response;
  let cautionText = cautionResponse.text();
  // **で囲まれた部分を<strong>タグに変換
  cautionText = cautionText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  $("#caution").html(cautionText);

}

run();



