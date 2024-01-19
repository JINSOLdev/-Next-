export default function Write() {
    return (
        <div>
            <h4>글작성</h4>
            <form action="/api/list" method="POST">
                <input name="title" placeholder="제목을 입력해주세요" />
                <input name="content" placeholder="내용을 입력해주세요" />
                <button type="submit">버튼</button>
            </form>
        </div>
    );
}
