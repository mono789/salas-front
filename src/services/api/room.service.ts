import { RoomFilter } from "@/models/room";
import { METHOD, ROOMS_ENDPOINT } from "@/utils/constants/api.constants";
import { authorizedHeaders, service } from "./base-service";

const RoomService = {
    getAll: function({
        implement,
        restriction,
        software,
        computerAmount,
    }: RoomFilter) {
        // Build Filter Params
        let endpoint = `${ROOMS_ENDPOINT}?`;
        if (implement) endpoint = `${endpoint}implement=${implement}`;
        if (restriction) endpoint = `${endpoint}&restriction=${restriction}`;
        if (software) endpoint = `${endpoint}&software=${software}`;
        if (computerAmount)
            endpoint = `${endpoint}&computerAmount=${computerAmount}`;
        // Make request
        return service(endpoint, METHOD.get, authorizedHeaders());
    },
};

export default RoomService;
