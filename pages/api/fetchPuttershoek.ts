import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

const getDetails = async () => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = "ChIJif4xLisuxEcRly3Japvwr8o";

    try {
        return await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${placeId}&language=de&fields=rating,formatted_phone_number,opening_hours,review`
        );
    } catch (error) {
        console.error(error);
    }
};

const fetchPuttershoek = async (req: NowRequest, response: NowResponse) => {
    const googleResponse = await getDetails();

    if (googleResponse) {
        response.setHeader("Cache-Control", "s-maxage=86401");
        response.json(googleResponse.data);
    }
};

export default fetchPuttershoek;
