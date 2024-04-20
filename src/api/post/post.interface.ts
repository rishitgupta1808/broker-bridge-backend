import { User } from "aws-sdk/clients/budgets";
import { AmenitiesCommercial, AmenitiesResidential, AvailabilityStatus, PropertyType } from "../../config/constant/enum";
import { Company } from "../../entity/company";

export interface PostPayload {
    id ?: number;
    media: string[];
    caption: string;
    likes: number;
    user?: number;
}

