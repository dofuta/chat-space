$(document).on('turbolinks:load', function()  {
  function buildHTML(message) {
    // 画像の投稿があった場合
    if(message.image_url != undefined){
      var image = `<img class='ChatMain__messageBodyImage', src="${message.image_url}">`
    }else{
    // 画像の投稿がなかった場合
      var image = ''
    }
    // メッセージのhtmlを作成
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
                  ${image}
                </div>`
    return html;
  }

  function buildFlash(flashmessage,type){
    // flashmessageを削除
    $('.FlashMessage').empty();
    // flashmessageを作成
      var flashmessage = `<p class='FlashMessage__${type}'>
                            ${flashmessage}
                          <p>`
      // flashmessageを挿入
      $('.FlashMessage').prepend(flashmessage)
  };

  $('#new_message').on('submit', function(e){ // submitされた時に送られるparamsが引数に入る
    e.preventDefault();
    var formData = new FormData(this);// FormDataオブジェクトによってformのhtmlをパラメータの形にデータ化することができる
    var url = $(this).attr('action');//attr()は指定されたhtmlタグの属性を取得するメソッド。action属性はリンクになっている。

    //テキスト・画像が共にnullではなかった場合
    if ((formData.get('message[text]') != "") || (formData.get('message[image]').size != 0)){
      //非同期通信を行う
      $.ajax({
        url: url,
        type: "GET",
        dataType: 'json', //ここで要求するデータ形式を（format）を指定
      })
      //成功した場合
      .done(function(data) {// 非同期通信(ajax)成功時、即時関数の第一引数（ここではdata）にはサーバからの返り値が自動で代入される
        var html = buildHTML(data);
        $('.ChatMain__body').append(html) //新たに生成されたhtmlをchatmain_body以下の最後に追加する
        $('.ChatMain__footerTypeArea').val('') //タイプエリアを空白にする
        $('#message_image').val('') //imageファイルを空にする
        $('.ChatMain__body').animate({scrollTop: $('.ChatMain__body')[0].scrollHeight}, 500, 'swing'); //最新のメッセージまで移動
        buildFlash("メッセージを送信しました。","notice")
      })
      //失敗した場合
      .fail(function(){
        // 予備知識
        // $.rails.enableFormElements($('#new_message')); //使用済みのformを有効化する。（本来は書かなくてもjquery-railsがやってくれているはずなのだが、、）
        // formのタグにdisabledが追加されてボタンが押せなくなってしまうので、ここで上記を記入して解除か、application.rbに記述して自動の昨日を解除
        buildFlash("メッセージの送信に失敗しました。","alert");
      });
    }
    else{
      buildFlash("メッセージを入力してください。","alert");
    }
  });
});
