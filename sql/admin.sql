# 관리자용 계정 생성용, 유저타입 2로 바꾸어 관리자 계정으로 변경
update user set user_type = 2 where user_id = 1;