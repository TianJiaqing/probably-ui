const modules = import.meta.glob('./**/index.js', { eager: true })
let _ = {}
for (const key in modules) {
    modules[key]['default'] && (_ = { ..._, ...modules[key]['default'] })
}
export default {
    ..._
}

