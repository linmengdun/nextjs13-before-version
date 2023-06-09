import React from 'react'
import { Metadata } from "next"
import { inject, observer } from 'mobx-react'
import CustomHead from '@components/custom-head'

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

class ViewAdapter extends React.Component {

    renderView() {
        const { pc, h5, title = '', keywords = '', description = '', showSiteName = true, site = null }: any = this.props
        const { platform } = site
        const curr = platform === 'pc' ? (pc || null) : (h5 || null)

        return (
            <>
                <CustomHead title={title} keywords={keywords} description={description} showSiteName={showSiteName} />
                {curr}
            </>
        );
    }

    render() {
        return this.renderView();
    }
}

export default ViewAdapter;