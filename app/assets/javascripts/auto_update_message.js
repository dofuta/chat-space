
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
    var html = `<div class='ChatMain__message', data-messageid= "${message.id}">
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

  // 5000msごとに実行される（前の処理が途中で止まっていたとしても、とにかく5秒ごとに発火)
  setInterval(function(){
      // pathにmessageが含まれていたら(チャット画面になっていたら)
    if ($(location).attr('pathname').match(/message/)){
      //現在のurlを取得
      var url = $(location).attr("href");
      //テキスト・画像が共にnullではなかった場合
      var data = {"last_message_id": $('.ChatMain__message:last-child').data('messageid')}
      //非同期通信を行う
      $.ajax({
        url: url,
        type: "GET",
        data:  data, //上記で定義した最後のメッセージのidを代入
        dataType: 'json', //ここで要求するデータ形式を（format）を指定
      })
      //成功した場合
      .done(function(messages) {// 非同期通信(ajax)成功時、即時関数の第一引数（ここではmessages）にはサーバからの返り値が自動で代入される
        //受け取ったjson形式のデータを配列化して、forEachする
        Object.keys(messages).forEach(function (message){
          var html = buildHTML(message);
          $('.ChatMain__body').append(html) //新たに生成されたhtmlをchatmain_body以下の最後に追加する
        })
        $('.ChatMain__body').animate({scrollTop: $('.ChatMain__body')[0].scrollHeight}, 500, 'swing'); //最新のメッセージまで移動
      })
      //失敗した場合
      .fail(function(){
        buildFlash("メッセージの取得に失敗しました。","alert");
      });
    }
  }, 5000); //5000msごとに発火
});
