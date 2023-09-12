const board = {
    list: function(list) {  // 글 목록보기
        let html = `<html><title>Board</title>`
        console.log(list.length)
        for (let i = 0; i < list.length ; i++) {
            var { id, title, writer } = list[i]
            html = html + `<p>${id}. <a href="/board/${id}">${title}</a>   <em>written by ${writer}</em></p>`
        }
        html = html + '<p><a href="/board/create">글 작성하기</p></html>'
        console.log(list.length)
        return html
    },

    page: function(title, body, date, id) {  // 글 상세보기
        const html = `
        <html>
            <title>${title}</title>
            <p>${body}</p>
            <em><p>${date}<em></p></em>
            <form action="/board/update/${id}">
                <input type="submit" value="수정">
            </form>
            <form action="/board/delete" method="post">
                <input type="hidden" name="id" value="${id}">
                <input type="submit" value="삭제">
            </form>
            <p><a href="/board">목록</a></p>
        </html>
        `
        return html;
    },

    create: function() {
        const html = `
        <html>
            <title>Create</title>
            <form action="/board/create" method="post">
                <p><input type="text" name="title" placeholder="제목"></p>
                <p><textarea name="body" placeholder="내용"></textarea></p>
                <input type="hidden" name="writer", value="5">
                <input type="hidden" name="category", value="3">
                <input type="submit" value="작성">
            </form>
            <p><a href="/board">목록</a></p>
        </html>
        `
        return html;
    },

    update: function(title, body, id) {
        const html = `
        <html>
            <title>${title}</title>
            <form action="/board/update" method="post">
                <input type="hidden" name="id" value="${id}">
                <p><input type="text" name="title" value="${title}"></p>
                <p><textarea name="body">${body}</textarea></p>
                <p><input type="submit" value="수정"></p>
            </form>
            <form action="/board/delete" method="post">
                <input type="hidden" name="id" value="${id}">
                <input type="submit" value="삭제">
            </form>
            <p><a href="/board">목록</a></p>
        </html>
        `
        return html;
    }
}

module.exports = board;