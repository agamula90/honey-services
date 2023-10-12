import {useAsync} from "react-async-hook";
import {fetchAsideItems, fetchContentItems} from "./mocks";
import Navigation from "../Navigation";
import Banner, { BannerState, MoveDirection } from './Banner';
import ContentItems from "./ContentItems";
import Aside from "./Aside";
import ContactUs from "../ContactUs";
import React, {useEffect, useState} from "react";

let intervalId;
const countBanners = 5;
export default function MainPage() {
    const [bannerState, setBannerState] = useState<BannerState>({
        currentItemIndex: 0,
        autoMoveEnabled: true,
        resumeAutoMove: false,
        moveDirection: 'right',
    });
    const contentItems = useAsync(fetchContentItems, []);
    const asideItems = useAsync(fetchAsideItems, []);

    useEffect(() => {
        if (bannerState.autoMoveEnabled) {
            if (bannerState.moveDirection == 'right') {
                doMoveNext(bannerState.currentItemIndex, (index) => {
                    setBannerState({...bannerState, currentItemIndex: index});
                });
            } else {
                doMovePrevious(bannerState.currentItemIndex, (index) => {
                    setBannerState({...bannerState, currentItemIndex: index});
                });
            }
        } else if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        if (bannerState.resumeAutoMove) {
            setBannerState({...bannerState, resumeAutoMove: false});
        }

        const handleBannerAutoMove = () => {
            const autoMoveEnabled = window.scrollY < 1;
            if (autoMoveEnabled != bannerState.autoMoveEnabled) {
                setBannerState({...bannerState, autoMoveEnabled});
            }
        };
        window.addEventListener('scroll', handleBannerAutoMove);
        return () => {
            clearInterval(intervalId);
            intervalId = null;
            window.removeEventListener('scroll', handleBannerAutoMove);
        };
    }, [bannerState]);

    if (contentItems.loading) {
        return 'Data loading... Please, wait...';
    }
    if (contentItems.error) {
        return `Error occurred: ${contentItems.error.message}`;
    }

    return (
        <>
            <div className="main">
                <Banner
                    bannerState={bannerState}
                    countBanners={countBanners}
                    onManualMove={() => {
                        const moveDirection: MoveDirection =
                            bannerState.moveDirection === 'right' ? 'left' : 'right';
                        setBannerState({
                            ...bannerState,
                            resumeAutoMove: true,
                            moveDirection,
                        });
                    }}
                />
                <ContentItems contentItems={contentItems.result}/>

                <Aside asideItems={asideItems.result}/>
            </div>
            <ContactUs/>
        </>
    );
}

function doMovePrevious(currentItemIndex, onItemChanged) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        if (currentItemIndex === 0) {
            currentItemIndex = countBanners - 1;
        } else {
            currentItemIndex--;
        }
        onItemChanged(currentItemIndex);
    }, 3000);
}

function doMoveNext(currentItemIndex, onItemChanged) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        if (currentItemIndex === countBanners - 1) {
            currentItemIndex = 0;
        } else {
            currentItemIndex++;
        }
        onItemChanged(currentItemIndex);
    }, 3000);
}
