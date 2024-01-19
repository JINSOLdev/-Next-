export default function Signup() {
    return (
        <div>
            <h4>회원가입</h4>
            <form action="/api/post/member_new" method="POST">
                <input name="name" placeholder="이름을 입력해주세요" />
                <input name="id" type="text" placeholder="아이디를 입력해주세요" />
                <input name="password1" type="password" placeholder="비밀번호를 입력해주세요" />
                <input name="password2" type="password" placeholder="비밀번호를 확인해주세요" />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}
