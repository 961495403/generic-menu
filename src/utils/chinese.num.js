const toChineseNum = (num) => {
  if (typeof num !== 'number') {
    return ''
  }
  if (num === 0) {
    return '零'
  }
  const numberCharacter = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
  textCharacter = ['', '十', '百', '千'],
  wordCharacter = ['', '万', '亿'];

  /**
   * 输入数组，返回按照位数分割的数组
   * @param number 传入的数字
   * @param range 按照此位数将数字分割
   * @returns {Array} 返回用逗号分隔的数组
   */
  const splitStr = (number, range = 4) => {
    let str = number.toString();

    const[left] = str.split('.');

    const strArr = left.split('').reverse();

    let result = [];
    for (let i = 0; i < strArr.length; i += range) {
      result.push(strArr.slice(i, i + range).reverse().join(''))
    }
    return result.reverse()
  };

  /**
   * 输入一个四位数的数字，返回汉字表示
   * @param item
   * @returns {string}
   */
  const getChineseItem = item => {
    let temp = item.toString().split('').reverse().map((value, index) => {
      // 如果数字是0， 后面的两次就没有必要加了，例如102中的0， 就不需要翻译成为【零十】
      return numberCharacter[value] + (+value === 0 ? '' : textCharacter[index])
    }).reverse();

    // 多个重复的零只保留一个
    temp = temp.reduce((total, current) => {
      if (total[total.length - 1] === '零' && current === '零') {
        return total
      }
      total.push(current);
      return total
    }, []);

    // 针对12，将结果由[一十二]修正为[十二]
    if (temp.length === 2) {
      temp[0] = temp[0].replace(/一十/, '十')
    }

    // 结尾的零要忽略，针对10，将结果由[十零]修正为[十]
    if (temp[temp.length - 1] === '零') {
      temp.pop()
    }

    return temp.join('')
  };

  let splitArr = splitStr(num).reverse();
  return splitArr.map(v => getChineseItem(v)).map((v, index) => v + wordCharacter[index]).reverse().join('');
};

export default toChineseNum;