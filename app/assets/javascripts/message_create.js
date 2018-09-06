$(function() {
  function buildHTML(message) {
    var html = `<div class='ChatMain__message'>
                  <div class='ChatMain__messageUsername'>
                    ${message.user_name}
                  </div>
                  <div class='ChatMain__messageDate'>
                    ${message.created_at}
                  </div>
                  <div class='ChatMain__messageBody'>
                    ${message.text}
                  </div>
                  <img class='ChatMain__messageBodyImage', src="${message.image_url}">
                </div>`
    return html;
  }

  function buildFlash(flashmessage,type){
    // flashmessageを作成
    var flashmessage = `<p class='FlashMessage__${type}'>
                          ${flashmessage}
                        <p>`
    // flashmessageを挿入
    $('.FlashMessage').prepend(flashmessage)
  }

  $('#new_message').on('submit', function(e){ // submitされた時に送られるparamsが引数に入る
    e.preventDefault();
    var formData = new FormData(this);// FormDataオブジェクトによってformのhtmlをパラメータの形にデータ化することができる
    var url = $(this).attr('action');//attr()は指定されたhtmlタグの属性を取得するメソッド。action属性はリンクになっている。

    //テキスト・画像が共にnullではなかった場合
    if ((formData.get('message[text]') != "") || (formData.get('message[image]').size != 0)){
      //非同期通信を行う
      $.ajax({
        url: url,
        type: "POST",
        data: formData, //formDataを代入
        dataType: 'json', //ここで要求するデータ形式を（format）を指定
        processData: false, // dataに指定したオブジェクトをクエリ文字列(例: msg.txt?b1=%E3%81%8B&b2=%E3%81%8D )に変換する役割.デフォルトではtrueになっている。formDataオブジェクトは事前にクエリになっているので不要
        contentType: false //   サーバにデータのファイル形式を伝えるヘッダです。こちらはデフォルトでは「text/xml」でコンテンツタイプをXMLとして返してきます。
                           //   ajaxのリクエストがFormDataのときはどちらの値も適切な状態で送ることが可能なため、falseにすることで設定が上書きされることを防ぎます。
                           //   FormDataをつかってフォームの情報を取得した時には必ずfalseにするという認識で構いません。
      })
      //成功した場合
      .done(function(data) {// 非同期通信(ajax)成功時、即時関数の第一引数（ここではdata）にはサーバからの返り値が自動で代入される
        var html = buildHTML(data);
        $('.ChatMain__body').append(html) //新たに生成されたhtmlをchatmain_body以下の最後に追加する
        $('.ChatMain__footerTypeArea').val('') //タイプエリアを空白にする

        $.rails.enableFormElements($('#new_message')); //使用済みのformを有効化する。（本来は書かなくてもjquery-railsがやってくれているはずなのだが、、）

        buildFlash("メッセージを送信しました。","notice")
      })
      //失敗した場合
      .fail(function(){
        $.rails.enableFormElements($('#new_message')); //使用済みのformを有効化する。（本来は書かなくてもjquery-railsがやってくれているはずなのだが、、）
        buildFlash("メッセージの送信に失敗しました。","alert");
      });
    }
    else{
      buildFlash("メッセージを入力してください。","alert");
      // $('#commit').prop('disabled', false); //submitボタンを有効化する。（本来は書かなくてもjquery-railsがやってくれているはずなのだが、、）
    }
  });
});
