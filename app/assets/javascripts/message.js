$(document).on('turbolinks:load', function()  {
  // メッセージのhtml作成
  function buildHTML(message) {
    // 三項演算子で、投稿に画像がある場合とない場合でhtmlの生成を分ける
    var image = (message.image_url) ? `<img class='ChatMain__messageBodyImage', src="${message.image_url}">`:'';
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
  // notificationメッセージの表示
  function buildNotice(message,type){
    // notificationを削除
    $('.Notificaiton').empty();
    // htmlを作成
      var html = `<p class='Notification__${type}'>
                            ${message}
                          <p>`
      // htmlを挿入
      $('.Notificaiton').append(html);
  };

// メッセージ送信機能
  $('#new_message').on('submit', function(e){ // submitされた時に送られるparamsが引数に入る
    e.preventDefault();
    var formData = new FormData(this);// FormDataオブジェクトによってformのhtmlをパラメータの形にデータ化することができる
    var url = $(this).attr('action');//attr()は指定されたhtmlタグの属性を取得するメソッド。action属性はリンクになっている。

    //テキスト・画像が共にnullではなかった場合
    if ((formData.get('message[text]') != "") || (formData.get('message[image]').size != 0)){
      // 非同期通信を行う
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
      // 成功した場合
      .done(function(data) {// 非同期通信(ajax)成功時、即時関数の第一引数（ここではdata）にはサーバからの返り値が自動で代入される
        var html = buildHTML(data);
        $('.ChatMain__body').append(html) //新たに生成されたhtmlをchatmain_body以下の最後に追加する
        $('.ChatMain__footerTypeArea').val('') //タイプエリアを空白にする
        $('#message_image').val('') //imageファイルを空にする
        $('.ChatMain__body').animate({scrollTop: $('.ChatMain__body')[0].scrollHeight}, 500, 'swing'); //最新のメッセージまで移動
        // buildNotice("メッセージを送信しました。","notice");
      })
      // 失敗した場合
      .fail(function(){
        // 予備知識
        // $.rails.enableFormElements($('#new_message')); //使用済みのformを有効化する。（本来は書かなくてもjquery-railsがやってくれているはずなのだが、、）
        // formのタグにdisabledが追加されてボタンが押せなくなってしまうので、ここで上記を記入して解除か、application.rbに記述して自動の昨日を解除
        // buildNotice("メッセージの送信に失敗しました。","alert");
      });
    }
    else{
    // メッセージ・画像どちらかがnullだった場合
      // buildNotice("メッセージを入力してください。","alert");
    }
  });

// メッセージ自動更新機能
  // 5000msごとに実行される（前の処理が途中で止まっていたとしても、とにかく5秒ごとに発火)
  setInterval(function(){
      // チャット画面になっていたら
    if ($(location).attr('pathname').match(/message/)){
      //現在のurlを取得
      var url = $(location).attr("href");
      //ビューに表示されている中で最新のメッセージのidを取得
      var lastMessageId = $('.ChatMain__message:last-child').data('messageid');
      var data = {"last_message_id": lastMessageId}
      //非同期通信を行う
      $.ajax({
        url:   url,
        type: "GET",
        data:  data, //上記で定義した最後のメッセージのidを代入
        dataType: 'json', //ここで要求するデータ形式を（format）を指定
      })
      //成功した場合
      .done(function(messages) {// 非同期通信(ajax)成功時、即時関数の第一引数（ここではmessages）にはサーバからの返り値が自動で代入される
        //受け取ったjson形式の配列データをforEachする
        messages.forEach(function (message){
          var html = buildHTML(message);
          $('.ChatMain__body').append(html) //新たに生成されたhtmlをchatmain_body以下の最後に追加する
        })
        // 新たなメッセージを取得した場合
        if (messages.length != 0){
          // 最新のメッセージまで自動スクロールする
          $('.ChatMain__body').animate({scrollTop: $('.ChatMain__body')[0].scrollHeight}, 500, 'swing'); //最新のメッセージまで移動
        }
      })
      //失敗した場合
      .fail(function(){
        buildNotice("メッセージの取得に失敗しました。","alert");
      });
    }
  }, 5000); //5000msごとに発火
});
