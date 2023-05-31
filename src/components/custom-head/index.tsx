import React from 'react'
import { inject, observer } from 'mobx-react'
import Head from 'next/head'

interface headDto {
  title: string;
  keywords: string;
  description: string
  [proppName: string]: any;
}

// 默认取站点配置，当有特殊配置时，通过传入title和keywords可以组合和替换
const CustomHead = (props: headDto) => {
  const { title, keywords, description } = props
  const ico = ''
  return (
    <Head>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      {ico && <link rel="icon" href={ico}></link>}
      <title>{title}</title>
    </Head>
  );
}

export default CustomHead;
