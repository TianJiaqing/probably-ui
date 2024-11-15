let z = 1
const get_z = (num) => num ? z = num : z++
let list = []
let set_list = (num) => {
    list = []
    for (let i = 0; i < num; i++) {
        const str = '生成的value' + i * i
        list.push({
            key: i,
            value: str,
            flg: i % 2 == 1
        })
    }
    console.log(list.length);
}
set_list(10000)
// set_list(100)

export default {
    text: "o.O?",
    article: "------oooo--->>>>>>>>>>>>>>拉拉啦*/-113465478798adasd  1545666664-------oooo--->>>>>>>>>>>>>>拉拉啦*/-113465478798adasd------oooo--->>>>>>>>>>>>>>拉拉啦*/-113465478798adasd  1545666664-------oooo--->>>>>>>>>>>>>>拉拉啦*/-113465478798adasd  1545666664-  1545666664-------oooo--->>>>>>>>>>>>>>拉拉啦*/-113465478798adasd  1545666664-------oooo--->>>>>>>>>>>>>>拉拉啦*/-113465478798adasd  1545666664-------oooo--->>>>>>>>>>>>>>拉拉啦*/-113465478798adasd  1545666664-",
    dialog_title: '暂未充填弹窗标题',
    z: get_z,
    list,
    emits_name: {
        dialog: [
            'click'
        ]
    },
    tabs_options: {
        label: 'name',
    }
}
