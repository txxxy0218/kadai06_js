$(document).ready(function() {
    
    // =============================================================
    // Pixels API連携
    // =============================================================

    function updateBackground() {
        const apiKey = 'CzhRrWW4O3Ta0MwB0cxAZmEc6RTQ6RUdb2Oz6dPqlh14eIr3aNCdleHB';
        const query = 'Landscape';
        const url = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;

        fetch(url, {
            headers: {
                Authorization: apiKey
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.photos && data.photos.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.photos.length);
                const photoUrl = data.photos[randomIndex].src.large;

                // 画像を背景に設定
                $("#img-screen").css("background-image", `url(${photoUrl})`);
                $("#img-screen").css("background-repeat", "no-repeat");
                $("#img-screen").css("background-size", "cover");
            } else {
                console.error('No photos found');
            }
        })
        .catch(error => {
            console.error('Error fetching image from Pexels API:', error);
        });
    }

    // ページロード時に背景更新を一度だけ実行
    updateBackground();


    
    // =============================================================
    // ラジオボタンによるフォームの出しわけ
    // =============================================================

    // 初期状態で#q-real-estateを表示にする
    $('#q-real-estate-container').show();

    // ラジオボタンの状態が変わったときに実行
    $('input[name="radio-0"]').on('change', function() {
        if ($('input[name="radio-0"]:checked').val() === '不動産を所有している') {
            // 「不動産を所有している」がチェックされている場合
            $('#q-real-estate-container').show();
        } else {
            // 「不動産を所有していない」がチェックされている場合
            $('#q-real-estate-container').hide();
        }
    });

    // 初期状態を設定
    if ($('input[name="radio-0"]:checked').val() === '不動産を所有している') {
        $('#q-real-estate-container').show();
    } else {
        $('#q-real-estate-container').hide();
    }



    // 初期状態で#q-taを表示にする
    $('#q-ta-container').show();

    // ラジオボタンの状態が変わったときに実行
    $('input[name="ta"]').on('change', function() {
        if ($('input[name="ta"]:checked').val() === '有形資産を所有している') {
            // 「有形資産を所有している」がチェックされている場合
            $('#q-ta-container').show();
        } else {
            // 「有形資産を所有していない」がチェックされている場合
            $('#q-ta-container').hide();
        }
    });

    // 初期状態を設定
    if ($('input[name="ta"]:checked').val() === '有形資産を所有している') {
        $('#q-ta-container').show();
    } else {
        $('#q-ta-container').hide();
    }


    // 初期状態で#q-fcを表示にする
    $('#q-fc-container').show();

    // ラジオボタンの状態が変わったときに実行
    $('input[name="dependents"]').on('change', function() {
        if ($('input[name="dependents"]:checked').val() === '扶養家族がいる') {
            // 「不動産を所有している」がチェックされている場合
            $('#q-fc-container').show();
        } else {
            // 「不動産を所有していない」がチェックされている場合
            $('#q-fc-container').hide();
        }
    });

    // 初期状態を設定
    if ($('input[name="dependents"]:checked').val() === '扶養家族がいる') {
        $('#q-fc-congtainer').show();
    } else {
        $('#q-fc-congtainer').hide();
    }
    



    // =============================================================
    // ADD BUTTONのアクション
    // =============================================================

    let i = 2;

    $("#nationality-add").on("click", function(event) {
        event.preventDefault();  // デフォルトのイベントを防ぐ
    
        // q-nationalityのlabel要素を複製
        var newNationality = $("#q-nationality-1").clone();
        
        // 複製した要素のIDを変更（重複しないように）
        newNationality.attr("id", "q-nationality-" + i);
        newNationality.find('select').attr("id", "nationality-" + i); // select要素のIDも変更
    
        // 複製した要素をadd-buttonの直前に挿入
        newNationality.insertBefore("#nationality-add");
    
        i++;
    });

    $("#residence-add").on("click", function(event) {
        event.preventDefault();  // デフォルトのイベントを防ぐ
    
        // #q-residence-1の要素を複製
        var newResidence = $("#q-residence-1").clone();
    
        // 複製した要素内のselect[name="visa"]を取得
        var newVisa = newResidence.find('select[name="visa"]');
    
        // 複製した要素のIDを変更（重複しないように）
        newResidence.attr("id", "q-residence-" + i);
        newResidence.find("select[id^='residence-']").attr("id", "residence-" + i); // select要素のIDも変更
        newVisa.attr("id", "visa-" + i); // visaのIDを変更
    
        // 重複するfor属性を持つlabel要素があれば修正
        newResidence.find('label[for="visa-1"]').attr('for', 'visa-' + i);
    
        // 複製した要素を#residence-addの前に挿入
        newResidence.insertBefore("#residence-add");
    
        i++;  // 次のインクリメント
    });

    $("#job-add").on("click", function(event) {
        event.preventDefault();  // デフォルトのイベントを防ぐ

        // q-nationalityのlabel要素を複製
        var newJob = $("#q-job-1").clone();
        
        // 複製した要素のIDを変更（重複しないように）
        newJob.attr("id", "q-job-" + i);
        newJob.find('input').attr("id", "job-" + i); // select要素のIDも変更

        // 複製した要素をadd-buttonの直前に挿入
        newJob.insertBefore("#job-add");

        i++;  // 次のインクリメント
    });


    //-------------------------------------------------


    $("#business-add").on("click", function(event) {
        event.preventDefault();  // デフォルトのイベントを防ぐ

        var newBusiness = $("#q-business-1").clone();
        var newBusinessCountry = newBusiness.find('select[id^="b-country-"]');
        var newBusinessCurrency = newBusiness.find('select[id^="b-currency-"]');
        
        // 複製した要素のIDを変更（重複しないように）
        newBusiness.attr("id", "q-business-" + i);
        newBusiness.find('input').attr("id", "business-" + i); // select要素のIDも変更
        newBusinessCountry.attr("id", "b-country-" + i); // IDを変更
        newBusinessCurrency.attr("id", "b-currency-" + i); // IDを変更

        // 複製した要素をadd-buttonの直前に挿入
        newBusiness.insertBefore("#business-add");

        i++;  // 次のインクリメント
    });

    $("#salary-add").on("click", function(event) {
        event.preventDefault();  // デフォルトのイベントを防ぐ

        var newSalary = $("#q-salary-1").clone();
        var newSalaryCountry = newSalary.find('select[id^="s-country-"]');
        var newSalaryCurrency = newSalary.find('select[id^="s-currency-"]');
        var newSalaryWithholdingTax = newSalary.find('fieldset[id^="s-withholding-tax-"]');
        
        // 複製した要素のIDを変更（重複しないように）
        newSalary.attr("id", "q-saraly-" + i);
        newSalary.find('input').attr("id", "salary-" + i); // select要素のIDも変更
        newSalaryCountry.attr("id", "s-country-" + i); // IDを変更
        newSalaryCurrency.attr("id", "s-currency-" + i); // IDを変更
        newSalaryWithholdingTax.attr("id", "s-withholding-tax-" + i); // IDを変更
        newSalaryWithholdingTax.attr("name", "radio-" + i); // fieldsetのnameを変更
        newSalaryWithholdingTax.find('input').attr("name", "radio-" + i); // inputのnameを変更

        // 複製した要素をadd-buttonの直前に挿入
        newSalary.insertBefore("#salary-add");

        i++;  // 次のインクリメント
    });

    //-------------------------------------------------

    $("#real-estate-add").on("click", function(event) {
        event.preventDefault();  // デフォルトのイベントを防ぐ

        // q-nationalityのlabel要素を複製
        var newRE = $("#q-real-estate-1").clone();
        var newRECountry = newRE.find('select[id^="re-country-"]');
        var newREType = newRE.find('select[id^="re-type-"]');
        var newREIncome = newRE.find('fieldset[id^="re-income-"]');
        
        // 複製した要素のIDを変更（重複しないように）
        newRE.attr("id", "q-real-estate-" + i);
        // newRE.find('input').attr("id", "salary-" + i); // select要素のIDも変更
        newRECountry.attr("id", "re-country-" + i); // IDを変更
        newREType.attr("id", "re-type-" + i); // IDを変更
        newREIncome.attr("id", "re-income-" + i); // IDを変更
        newREIncome.attr("name", "radio-" + i); // fieldsetのnameを変更
        newREIncome.find('input').attr("name", "radio-" + i); // inputのnameを変更
        
        // 複製した要素をadd-buttonの直前に挿入
        newRE.insertBefore("#real-estate-add");

        i++;  // 次のインクリメント
    });

    $("#fa-add").on("click", function(event) {
        event.preventDefault();  // デフォルトのイベントを防ぐ

        // q-nationalityのlabel要素を複製
        var newBank = $("#q-fa-1").clone();
        var newBankCountry = newBank.find('select[id^="bank-country-"]');
        var newBankType = newBank.find('select[id^="bank-type-"]');
        var newBankBalance = newBank.find('input[id^="bank-balance-"]');
        
        // 複製した要素のIDを変更（重複しないように）
        newBank.attr("id", "q-fa-" + i);
        newBankCountry.attr("id", "bank-country-" + i); // IDを変更
        newBankType.attr("id", "bank-type-" + i); // IDを変更
        newBankBalance.attr("id", "bank-balance-" + i); // IDを変更
        
        // 複製した要素をadd-buttonの直前に挿入
        newBank.insertBefore("#fa-add");

        i++;  // 次のインクリメント
    });

    $("#ta-add").on("click", function(event) {
        event.preventDefault();  // デフォルトのイベントを防ぐ

        // q-nationalityのlabel要素を複製
        var newTA = $("#q-ta-1").clone();
        var newTACountry = newTA.find('select[id^="ta-country-"]');
        var newTAType = newTA.find('input[id^="ta-type-"]');
        
        // 複製した要素のIDを変更（重複しないように）
        newTA.attr("id", "q-ta-" + i);
        newTACountry.attr("id", "ta-country-" + i); // IDを変更
        newTAType.attr("id", "ta-type-" + i); // IDを変更

        
        // 複製した要素をadd-buttonの直前に挿入
        newTA.insertBefore("#ta-add");

        i++;  // 次のインクリメント
    });

    //-------------------------------------------------

    $("#ot-add").on("click", function(event) {
        event.preventDefault();  // デフォルトのイベントを防ぐ

        // q-nationalityのlabel要素を複製
        var newOverseasTravel = $("#q-ot-1").clone();
        var newCountryOfStay = newOverseasTravel.find('select[id^="country-of-stay-"]');
        var newLengthOfStay = newOverseasTravel.find('input[id^="length-of-stay-"]');
        
        // 複製した要素のIDを変更（重複しないように）
        newOverseasTravel.attr("id", "q-ot-" + i );
        newCountryOfStay.attr("id", "country-of-stay-" + i); // IDを変更
        newLengthOfStay.attr("id", "length-of-stay-" + i); // IDを変更
        
        // 複製した要素をadd-buttonの直前に挿入
        newOverseasTravel.insertBefore("#ot-add");

        i++;  // 次のインクリメント
    });

    $("#fc-add").on("click", function(event) {
        event.preventDefault();  // デフォルトのイベントを防ぐ

        // q-nationalityのlabel要素を複製
        var newFamComposition = $("#q-fc-1").clone();
        var newRelationship = newFamComposition.find('input[id^="relationship-"]');
        var newFamCountry = newFamComposition.find('select[id^="fam-country-"]');
        var newFamIncome = newFamComposition.find('input[id^="fam-income-"]');
        
        // 複製した要素のIDを変更（重複しないように）
        newFamComposition.attr("id", "q-fc-" + i);
        newRelationship.attr("id", "relationship-" + i); // IDを変更
        newFamCountry.attr("id", "fam-country-" + i); // IDを変更
        newFamIncome.attr("id", "fam-income-" + i); // IDを変更
        
        // 複製した要素をadd-buttonの直前に挿入
        newFamComposition.insertBefore("#fc-add");

        i++;  // 次のインクリメント
    });
});
