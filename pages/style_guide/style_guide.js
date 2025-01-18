async function setHeader(loading) {
    loading = $('#navigation').load('../../components/header.html', function(){
        const selected = "nav_style_guide"
        setHeader(selected)
    })
    return loading
}