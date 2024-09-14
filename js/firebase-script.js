// =============================================================
// Firebase連携
// =============================================================

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, get, push, set, update, remove, onChildAdded, onChildRemoved, onChildChanged } 
from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "***",
    authDomain: "***",
    projectId: "***",
    storageBucket: "***",
    messagingSenderId: "***",
    appId: "***"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getDatabase(app); //RealtimeDBに接続
const dbRef = ref(db,"users"); //RealtimeDB内の"user"を使う


// ==============================================================
// ユーザーIDの取得
// ==============================================================

$(document).ready(function() {
    // ローカルストレージからユニークIDを取得
    const uniqueId = localStorage.getItem('uniqueId');

    // ユニークIDが存在しない場合（初回訪問時）
    if (!uniqueId) {
      // ユニークIDを生成
      const newUniqueId = generateUniqueId();
      // ローカルストレージに保存
      localStorage.setItem('uniqueId', newUniqueId);
      // FirebaseにユニークIDを保存
      const userRef = ref(db, "users/" + newUniqueId); // ユニークIDをキーとして参照を作成
      set(userRef, { id: newUniqueId })  // 新しいユーザーオブジェクトを保存
        .then(() => {
          console.log('新規IDを保存しました:', newUniqueId);
        })
        .catch((error) => {
          console.error('エラーが発生しました:', error);
        });
      // 生成したユニークIDを使って何か処理を行う
      console.log('初回訪問です。ユニークID:', newUniqueId);
    } else {
      // 2回目以降の訪問
      console.log('2回目以降の訪問です。ユニークID:', uniqueId);
    }
  });

  function generateUniqueId() {
    // ユニークなIDを生成する関数（例：UUID）
    return 'user-' + Math.random().toString(36).substr(2, 9);
  }



// ==============================================================
// 次に進むボタンのアクション
// ==============================================================

//STEP1の「次に進む」アクション

$(document).ready(function() {
    $("#send1").on("click", function(){

        //国籍の取得
        const nationalities = []; // 入力欄から値を取得して配列にまとめる
        // すべてのnationality-要素を取得し、値を配列に追加
        $("select[id^='nationality-']").each(function() {
            nationalities.push($(this).val());
        });

        //居住国の取得
        const residences = []; // 入力欄から値を取得して配列にまとめる
        // すべてのnationality-要素を取得し、値を配列に追加
        $("select[id^='residence-']").each(function() {
            residences.push($(this).val());
        });

        //ビザの取得
        const visas = []; // 入力欄から値を取得して配列にまとめる
        // すべてのnationality-要素を取得し、値を配列に追加
        $("select[id^='visa-']").each(function() {
            visas.push($(this).val());
        });

        //職業の取得
        const jobs = []; // 入力欄から値を取得して配列にまとめる
        // すべてのnationality-要素を取得し、値を配列に追加
        $("input[id^='job-']").each(function() {
            jobs.push($(this).val());
        });

        const data = {
            nationalities: nationalities,
            residences: residences,
            visas: visas,
            jobs: jobs
        };

        // ローカルストレージからユニークIDを取得
        const uniqueId = localStorage.getItem('uniqueId');
        if (uniqueId) {
            const uniqueRef = ref(db, "users/" + uniqueId); // Firebase Realtime Databaseの参照を取得

            // 既存ユーザーのデータを更新
            update(uniqueRef, data)  // updateメソッドを使ってデータを保存
                .then(() => {
                    console.log('データが更新されました:', data);
                })
                .catch((error) => {
                    console.error('エラーが発生しました:', error);
                });
        } else {
            console.error('ユニークIDが見つかりません。');
        }
    });
});



//STEP2の「次に進む」アクション

$(document).ready(function() {
    $("#send2").on("click", function(){

        //事業の種類の取得
        const businesses = []; // 入力欄から値を取得して配列にまとめる
        $("input[id^='business-']").each(function() {
            businesses.push($(this).val());
        });

        //事業を行なっている国の取得
        const bCountries = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='b-country-']").each(function() {
            bCountries.push($(this).val());
        });

        //収入の発生源の国の取得
        const bCurrencies = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='b-currency-']").each(function() {
            bCurrencies.push($(this).val());
        });

        //勤務している会社の所在国の取得
        const sCountries = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='s-country-']").each(function() {
            sCountries.push($(this).val());
        });

        //支払われる通貨の取得
        const sCurrencies = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='s-currency-']").each(function() {
            sCurrencies.push($(this).val());
        });

        //源泉徴収の有無の取得
        const WithholdingTax = []; // 入力欄から値を取得して配列にまとめる
        $("fieldset[id^='s-withholding-tax-']").each(function() {
            // 各fieldset内の選択されたラジオボタンの値をチェック
            $("fieldset[id^='s-withholding-tax-']").each(function() {
                let selectedValue = $(this).find("input[name='radio-1']:checked").val();
                if (selectedValue) {
                    console.log("Selected value:", selectedValue); // デバッグ用
                    WithholdingTax.push(selectedValue);
                }
            });
        });

        const data = {
            businesses: businesses,
            businessCountries: bCountries,
            businessCurrencies: bCurrencies,
            salaryCountries: sCountries,
            salaryCurrencies: sCurrencies,
            WithholdingTax: WithholdingTax
        };

        // ローカルストレージからユニークIDを取得
        const uniqueId = localStorage.getItem('uniqueId');
        if (uniqueId) {
            const uniqueRef = ref(db, "users/" + uniqueId); // Firebase Realtime Databaseの参照を取得

            // 既存ユーザーのデータを更新
            update(uniqueRef, data)  // updateメソッドを使ってデータを保存
                .then(() => {
                    console.log('データが更新されました:', data);
                })
                .catch((error) => {
                    console.error('エラーが発生しました:', error);
                });
        } else {
            console.error('ユニークIDが見つかりません。');
        }
    });
});


//STEP3の「次に進む」アクション

$(document).ready(function() {
    $("#send3").on("click", function(){

        //不動産の有無の取得
        const haveRealEstate = []; // 入力欄から値を取得して配列にまとめる
        $("fieldset[id='re-own']").each(function() {
            let selectedValue = $(this).find("input[name='radio-0']:checked").val();
            if (selectedValue) {
                console.log("Selected value:", selectedValue); // デバッグ用
                haveRealEstate.push(selectedValue);
            }
        });

        //不動産を所有している国の取得
        const reCountries = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='re-country-']").each(function() {
            reCountries.push($(this).val());
        });

        //不動産の種類の取得
        const reTypes = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='re-type-']").each(function() {
            reTypes.push($(this).val());
        });

        //不動産収入の有無の取得
        const reIncomes = []; // 入力欄から値を取得して配列にまとめる
        $("fieldset[id^='re-income-']").each(function() {
            // 各fieldset内の選択されたラジオボタンの値をチェック
            $("fieldset[id^='re-income-']").each(function() {
                let selectedValue = $(this).find("input[name='radio-1']:checked").val();
                if (selectedValue) {
                    console.log("Selected value:", selectedValue); // デバッグ用
                    reIncomes.push(selectedValue);
                }
            });
        });

        //銀行口座を所有している国の取得
        const bankCountries = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='bank-country-']").each(function() {
            bankCountries.push($(this).val());
        });

        //口座の種類の取得
        const bankTypes = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='bank-type-']").each(function() {
            bankTypes.push($(this).val());
        });

        //口座残高の取得
        const bankBalances = []; // 入力欄から値を取得して配列にまとめる
        $("input[id^='bank-balance-']").each(function() {
            bankBalances.push($(this).val());
        });

        //有形資産の有無の取得
        const haveTangibleAssets = []; // 入力欄から値を取得して配列にまとめる
        $("fieldset[id='ta-own']").each(function() {
            let selectedValue = $(this).find("input[name='ta']:checked").val();
            if (selectedValue) {
                console.log("Selected value:", selectedValue); // デバッグ用
                haveTangibleAssets.push(selectedValue);
            }
        });

        //有形資産を所有している国の取得
        const taCountries = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='ta-country-']").each(function() {
            taCountries.push($(this).val());
        });

        //有形資産の種類の取得
        const taTypes = []; // 入力欄から値を取得して配列にまとめる
        $("input[id^='ta-type-']").each(function() {
            taTypes.push($(this).val());
        });


        const data = {
            haveRealEstate: haveRealEstate,
            realEstateCountries: reCountries,
            realEstateTypes: reTypes,
            realEstateIncomes: reIncomes,
            bankCountries: bankCountries,
            bankTypes: bankTypes,
            bankBalances: bankBalances,
            haveTangibleAssets: haveTangibleAssets,
            tangibleAssetsCountries: taCountries,
            tangibleAssetsTypes:taTypes
        };

        // ローカルストレージからユニークIDを取得
        const uniqueId = localStorage.getItem('uniqueId');
        if (uniqueId) {
            const uniqueRef = ref(db, "users/" + uniqueId); // Firebase Realtime Databaseの参照を取得

            // 既存ユーザーのデータを更新
            update(uniqueRef, data)  // updateメソッドを使ってデータを保存
                .then(() => {
                    console.log('データが更新されました:', data);
                })
                .catch((error) => {
                    console.error('エラーが発生しました:', error);
                });
        } else {
            console.error('ユニークIDが見つかりません。');
        }
    });
});

//STEP4の「次に進む」アクション

$(document).ready(function() {
    $("#send4").on("click", function(){

        //滞在（予定）国の取得
        const countriesOfStay = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='country-of-stay-']").each(function() {
            countriesOfStay.push($(this).val());
        });

        //滞在（予定）日数の取得
        const lengthOfStay = []; // 入力欄から値を取得して配列にまとめる
        $("input[id^='length-of-stay-']").each(function() {
            lengthOfStay.push($(this).val());
        });

        //扶養家族の有無の取得
        const haveDependents = []; // 入力欄から値を取得して配列にまとめる
        $("fieldset[id='have-Dependents']").each(function() {
            let selectedValue = $(this).find("input[name='dependents']:checked").val();
            if (selectedValue) {
                console.log("Selected value:", selectedValue); // デバッグ用
                haveDependents.push(selectedValue);
            }
        });

        //続柄の取得
        const relationships = []; // 入力欄から値を取得して配列にまとめる
        $("input[id^='relationship-']").each(function() {
            relationships.push($(this).val());
        });

        //扶養家族の居住国の取得
        const famCountries = []; // 入力欄から値を取得して配列にまとめる
        $("select[id^='fam-country-']").each(function() {
            famCountries.push($(this).val());
        });

        //扶養家族の年収の取得
        const famIncome = []; // 入力欄から値を取得して配列にまとめる
        $("input[id^='fam-income-']").each(function() {
            famIncome.push($(this).val());
        });


        const data = {
            countriesOfStay: countriesOfStay,
            lengthOfStay: lengthOfStay,
            haveDependents: haveDependents,
            relationships: relationships,
            famCountries: famCountries,
            famIncome: famIncome
        };

        // ローカルストレージからユニークIDを取得
        const uniqueId = localStorage.getItem('uniqueId');
        if (uniqueId) {
            const uniqueRef = ref(db, "users/" + uniqueId); // Firebase Realtime Databaseの参照を取得

            // 既存ユーザーのデータを更新
            update(uniqueRef, data)  // updateメソッドを使ってデータを保存
                .then(() => {
                    console.log('データが更新されました:', data);
                })
                .catch((error) => {
                    console.error('エラーが発生しました:', error);
                });
        } else {
            console.error('ユニークIDが見つかりません。');
        }
    });
});


// ==============================================================
// 確認ページへのデータの流し込み
// ==============================================================

$(document).ready(function() {
    const uniqueId = localStorage.getItem('uniqueId');
    const uniqueRef = ref(db, "users/" + uniqueId); // Firebase Realtime Databaseの参照を取得
    
    // データを取得するためにget()を使う
    get(uniqueRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val(); // ユーザーデータ全体を取得

            // 対応するIDとデータのマッピング
            const dataMapping = {
                nationalities: "#nationality-answer",
                residences: "#country-answer",
                visas: "#visa-answer",
                jobs: "#job-answer",
                businesses: "#b-name-answer",
                businessCountries: "#b-country-answer",
                businessCurrencies: "#b-income-country-answer",
                salaryCountries: "#s-country-answer",
                salaryCurrencies: "#s-currency-answer",
                WithholdingTax: "#withholding-tax-answer",
                haveRealEstate: "#re-have-answer",
                realEstateCountries: "#re-country-answer",
                realEstateTypes: "#re-name-answer",
                realEstateIncomes: "#re-income-answer",
                bankCountries: "#f-bank-country-answer",
                bankTypes: "#f-bank-type-answer",
                bankBalances: "#f-bank-balance-answer",
                haveTangibleAssets: "#ta-have-answer",
                tangibleAssetsCountries: "#ta-country-answer",
                tangibleAssetsTypes: "#ta-type-answer",
                countriesOfStay: "#ot-country-answer",
                lengthOfStay: "#ot-term-answer",
                haveDependents: "#fc-have-answer",
                relationships: "#fc-type-answer",
                famCountries: "#fc-country-answer",
                famIncome: "#fc-income-answer"
            };

            // データをループしてHTMLに書き込む
            Object.keys(dataMapping).forEach(key => {
                const value = userData[key]; // ユーザーデータから値を取得
                if (Array.isArray(value)) {
                    let htmlContent = '';
                    value.forEach(item => {
                        htmlContent += `<p>${item}</p>`;
                    });
                    $(dataMapping[key]).html(htmlContent); // 配列の場合
                } else {
                    $(dataMapping[key]).html(`<p>${value}</p>`); // 単一の値の場合
                }
            });
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
});