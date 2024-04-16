import { AmenitiesCommercial, AmenitiesResidential, AvailabilityStatus, PropertyType } from "../../config/constant/enum";
import { Company } from "../../entity/company";

export interface ProjectPayload {
    property_type: PropertyType;
    name: string;
    url: string;
    availability_status: AvailabilityStatus;
    rera_registration_number: string;
    location: string;
    amenities: AmenitiesResidential | AmenitiesCommercial;
    starting_price: number;
    media: string[];
    price_list: string;
    payment_plan: string;
    brocher: string;
    floor_plan_2d: string;
    floor_plan_3d: string;
    virtual_tour: string;
    company: number;
    total_area : number;
    bhk_value : string;


}

export interface ListtProjectPayload {
    property_type : PropertyType;
    search : string;
    id : string;
}