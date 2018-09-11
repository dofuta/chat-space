$(document).on('turbolinks:load', function() {
  // リスト表示する親要素
  var search_list = $('#user-search-result');

  // 各ユーザー表示のhtml作成の関数
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="user.id" data-user-name="user.name">追加</a>
                </div>`
    search_list.append(html);
  }
  // 一致するユーザーがいなかった時のhtml
  function appendNoUser(){
    var html = `<div class="chat-group-user clearfix">
                  <p>一致するユーザーは存在しません</p>
                </div>`
    search_list.append(html);
  }


  // 検索窓に文字が打ち込まれた時
  $('#user-search-field').on('keyup',function(){
    // インプットされたユーザー検索文字列
    var input = $('#user-search-field.chat-group-form__input').val();
    // 検索窓が空白でなければ
    if (input != ""){
      // ajaxを実行
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      // 成功した時
      .done(function(users){
        search_list.empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser();
        }
      })
      // 失敗した時
      .fail(function(data){
        alert("通信に失敗しました")
      })
    }
    else {
      search_list.empty(); //検索窓が空白の場合は検索リストを空にする
    }
  });
});
