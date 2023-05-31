import { useRouter } from 'next/router';
import Head from 'next/head'
import { initData } from '@/api/getApiData';

const Slug = ({ data }: any) => {
    const router = useRouter();
    const { slug } = router.query;

    return <>
        <Head>
            <title>My Page Title</title>
            <meta name="description" content="My page description" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        My page slug is: {JSON.stringify(slug)}{JSON.stringify(data)}
    </>
}


export async function getServerSideProps() {
    // 调用外部 API 获取博文列表
    const res = await initData()

    // 通过返回 { props: { posts } } 对象，Blog 组件
    // 在构建时将接收到 `posts` 参数
    return {
        props: {
            data: res,
        },
    }
}

export default Slug;
