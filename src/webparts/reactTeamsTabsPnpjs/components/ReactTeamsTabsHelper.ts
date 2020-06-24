import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import { graph } from "@pnp/graph";
import "@pnp/graph/teams";

export class ReactTeamsTabsHelper {

  public static async getGroupId(): Promise<string> {

    var id: string = "";

    var props: any = await sp.web.select("AllProperties")
      .expand("AllProperties")
      .get();

    if (props.AllProperties["GroupId"] != null) {
      id = props.AllProperties["GroupId"];
    }
    return id;
  }

  public static async getChannels(groupId: string): Promise<any[]> {

    var channels: any[]= [];

    channels = await graph.teams.getById(groupId).channels.get();

    return channels;
  }

  public static async getTabsFromChannel(groupId: string, channelId: string): Promise<any[]> {

    var tabs: any[] = [];

    tabs = await graph.teams.getById(groupId).channels.getById(channelId)
      .tabs
      .get();

    return  tabs;
  }

}