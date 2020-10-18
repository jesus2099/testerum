import {RunnerEvent} from "./runner.event";
import {EventKey} from "./fields/event-key.model";
import {RunnerEventTypeEnum} from "./enums/runner-event-type.enum";
import {Serializable} from "../../infrastructure/serializable.model";

export class ConfigurationEvent implements RunnerEvent, Serializable<ConfigurationEvent> {

    time: Date;
    eventKey: EventKey;
    eventType: RunnerEventTypeEnum = RunnerEventTypeEnum.CONFIGURATION_EVENT;
    //The rest of the properties are ignored. We don't use them in frontend

    deserialize(input: Object): ConfigurationEvent {

        this.time = new Date(input["time"]);
        this.eventKey = new EventKey().deserialize(input["eventKey"]);

        return this;
    }

    serialize(): string {
        return undefined;
    }
}