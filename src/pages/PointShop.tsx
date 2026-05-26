import PageContainer from '../components/common/PageContainer';
import LevelUpNoticeModal from '../components/shop/LevelUpNoticeModal';
import ShopItemList from '../components/shop/ShopItemList';

const PointShop = () => {
    return (
        <PageContainer backTo="/">
            <ShopItemList />
            <LevelUpNoticeModal />
        </PageContainer>
    );
};

export default PointShop;
