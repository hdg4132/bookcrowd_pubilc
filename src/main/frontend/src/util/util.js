 export function getCurrentDateTime() {
  
    // 현재 날짜 시간 구하기
    const now = new Date();
    
    // 년
    const year = now.getFullYear();
    // 월
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    // 일
    const day = now.getDate().toString().padStart(2, '0');
    // 시
    const hours = now.getHours().toString().padStart(2, '0');
    // 분
    const minutes = now.getMinutes().toString().padStart(2, '0');
    // 초
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}` //+ seconds;
  }

  export function toDateTime(dateArray) {
    let now;
    if (Array.isArray(dateArray) && dateArray.length >= 3) {
        const [year, month, day, hours, minutes, seconds] = dateArray;
        now = new Date(year, month - 1, day, hours || 0, minutes || 0, seconds || 0);
    } else {
        now = new Date();
    }

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`; // + ':' + seconds;
}

