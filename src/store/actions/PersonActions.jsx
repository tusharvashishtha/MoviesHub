export {removepeople} from "../reducers/PeopleSlice";
import axios from "../../utils/axios";
import { loadpeople } from "../reducers/PeopleSlice";

export const asyncloadperson = (id) => async (dispatch , getState) => {
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
        const tvCredits = await axios.get(`/person/${id}/tv_credits`);
        const movieCredits = await axios.get(`/person/${id}/movie_credits`);

        let ultimateDetails = {
            detail: detail.data,
            externalid: externalid.data,
            combinedCredits: combinedCredits.data,
            tvCredits: tvCredits.data,
            movieCredits: movieCredits.data
          
        }
        dispatch(loadpeople(ultimateDetails))
    
    } catch (error) {
        console.log("Error: ", error);
    }
}

