// 3. 서버기능 만들었음
'use server';

export async function handleSubmit(formData) {
    console.log(formData.get('title'));
}
