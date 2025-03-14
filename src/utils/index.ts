/**
 * 把对象转为formData
 */
export function objToFormData(obj: Recordable) {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key]);
  });
  return formData;
}

/** 修改css样式
 * @param {string} property css属性名
 * @param {string} value 要修改的值
 */
export function setCssProperty(property: string, value: string) {
  document.documentElement.style.setProperty(property, value);
}

/** 根据传入时间计算已经过去了多少天
 * @param {string} createTime 创建时间
 * @returns {number} differenceInDays 过去的天数
 */
export function getTimeDifference(createTime: string) {
  const start = new Date(createTime).getTime();
  const end = new Date().getTime();
  const differenceInMilliseconds = end - start;
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  return Math.ceil(differenceInDays);
}

// 数值转为中文大写
export function smalltoBIG(n: number): string {
  var fraction = ['角', '分'];
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);

  var s = '';

  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);

  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  );
}

// 匹配文字替换
export function matchText(text: string, content: string) {
  if (!text) return content;
  const reg = new RegExp(text, 'g');
  return content.replace(reg, (match) => {
    return `<span class="match-text">${match}</span>`;
  });
}
