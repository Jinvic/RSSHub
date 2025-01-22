import { type Route, type Data, ViewType } from '@/types';
import { parseDate } from '@/utils/parse-date'; // 解析日期的工具函数
import ofetch from '@/utils/ofetch'; // 统一使用的请求库

export const handler = async (): Promise<Data> => {
    // 发送 HTTP POST 请求到 API
    const response = await ofetch(`https://mblog.jinvic.top/api/memo/list`, {
        method: 'POST',
    });

    // 检查 API 响应是否成功
    if (!response || response.code !== 0) {
        throw new Error('Failed to fetch data from API');
    }

    // 打印调试信息
    // console.log('API Response:', response);
    // console.log('Data List:', response.data.list);

    // 从 API 响应中提取相关数据
    const items =
        response.data?.list?.map((item) => ({
            title: `Memo #${item.id}`,
            link: `https://mblog.jinvic.top/memo/${item.id}`,
            description: item.content,
            pubDate: parseDate(item.createdAt),
        })) || []; // 如果 data.list 为空，返回空数组

    return {
        // 源标题
        title: `Memos by Jinvic`,
        // 源链接
        link: `https://mblog.jinvic.top`,
        // 源文章
        item: items,
        // 其他信息
        language: 'zh-CN',
        logo: `https://mblog.jinvic.top/upload/jinvic`,
        icon: `https://blog.jinvic.top/favicon.ico`,
    };
};

export const route: Route = {
    path: '/memo',
    categories: ['social-media'],
    example: '/memo',
    parameters: {},
    features: {
        requireConfig: false,
        requirePuppeteer: false,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
        supportRadar: true,
    },
    url: 'mblog.jinvic.top',
    radar: [
        {
            source: ['mblog.jinvic.top', 'mblog.jinvic.top/memo/:id'],
            target: '/memo',
        },
    ],
    view: ViewType.SocialMedia,
    name: 'Memos',
    maintainers: ['Jinvic'],
    handler,
};
