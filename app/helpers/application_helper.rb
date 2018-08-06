module ApplicationHelper


  #時間を綺麗に表示するためのメソッド
  def simple_time(time)
    time.strftime("%Y/%m/%d %H:%M")
  end
end
