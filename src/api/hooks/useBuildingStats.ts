import { useQuery } from '@tanstack/react-query';

import BuildingAPI from '../building';
import type { IBuilding } from '../types';
import { BuildingType, CurrencyType } from '../types';
import useCurrency from './useCurrency';

const useBuildingStats = (
    slotNumber: number | null,
    building: IBuilding | null,
    isOpen: boolean,
) => {
    const { currency } = useCurrency();

    const isOperating = !!building?.fuelExpiredAt && new Date(building.fuelExpiredAt) > new Date();
    const hasUncollected =
        !!building?.fuelExpiredAt &&
        (building.lastCollectedAt === null ||
            new Date(building.lastCollectedAt) < new Date(building.fuelExpiredAt));
    const showHarvestUI = isOperating || hasUncollected;

    const { data: harvestData } = useQuery({
        queryKey: ['harvest-amount', slotNumber],
        queryFn: () => BuildingAPI.getAmountOfHarvest(slotNumber!),
        enabled: isOpen && slotNumber !== null && showHarvestUI,
    });

    const isPurification = building?.category === BuildingType.PURIFICATION;

    const { data: fuelCostData } = useQuery({
        queryKey: ['fuel-cost', slotNumber],
        queryFn: () => BuildingAPI.costOfOperate(slotNumber!),
        enabled: isOpen && slotNumber !== null && !showHarvestUI && !isPurification,
    });

    return {
        isOperating,
        showHarvestUI,
        harvestGems: harvestData?.gem ?? null,
        fuelCost: fuelCostData?.fuels ?? null,
        fuelBalance: currency[CurrencyType.FUEL],
    };
};

export default useBuildingStats;
