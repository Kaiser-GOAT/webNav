window.hashMap = []
const $webList = $('.webList')
const $lastLi = $webList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo:'X',url: 'https://xiedaimala.com'},
    {logo:'G',url: 'https://github.com'},
]
const simplify = (url) =>{
    return url.replace('http://','').replace('https://','').replace('www.','').replace('.com','').replace(/\/.*/,'')
}
const render = () =>{
$webList.find('li:not(.last)').remove()
 hashMap.forEach((node ,index) => {
    const $li = $( `<li>
        <div class="site">
        <div class="closeButton">
        <svg class="icon">
            <use xlink:href="#icon-close"></use>
        </svg>
    </div>
            <div class="logo"> ${node.logo} </div>
            <div class="name">${simplify(node.url)}</div>
        </div>
    </li>`).insertBefore($lastLi);
    $li.on('click',() =>{
        window.open(node.url)
    })
    $li.on('click','.closeButton',(e) =>{
        e.stopPropagation()
        hashMap.splice(index,1)
        render()
    })
})
}
render()

$('.addButton').on('click',() =>{
    let url =window.prompt('需要添加的网址是？')

if(url.indexOf('http') !== '0'){
    url = 'https://' + url
}
console.log(url)
hashMap.push({
    logo:simplify(url)[0].toUpperCase(),
    logoType:'text',
    url:url})
    console.log(hashMap);
    render()
})

window.onbeforeunload = () =>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}