$(document).on('turbolinks:load', function() {
  // リスト表示する親要素
  var added_user_list = $('#added_users');

  // 各ユーザー表示のhtml作成の関数
  function appendUserToGroup(user_id,user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    added_user_list.append(html);
  }

  // 追加のボタンが押された時

  $(document).on("click", ".chat-group-user__btn--add", function (){
    // user_idとuser_nameを事前に自身の要素の属性に保存しておいたので、それを取得する
    var user_id = $(this).attr('data-user-id')
    var user_name = $(this).attr('data-user-name')
    // 上記２つを使ってhtmlを作成
    appendUserToGroup(user_id,user_name);
    // 自身の親要素ごとhtmlを消す
    $(this).parent().remove();
  });

  // 削除のボタンが押された時
  $(document).on("click", ".chat-group-user__btn--remove", function (){
    // 親要素ごと削除
    $(this).parent().remove();
  });

});
