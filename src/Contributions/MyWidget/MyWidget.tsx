import * as React from "react";
import MyComponent from './MyComponent';
import { IWorkItemService } from './types';
import { showRootComponent } from "../../Common";

VSS.init({
    explicitNotifyLoaded: true,
    usePlatformStyles: true
});

VSS.require(["TFS/Dashboards/WidgetHelpers", "TFS/WorkItemTracking/RestClient"], function (WidgetHelpers: any, workItemTracking: any) {
    WidgetHelpers.IncludeWidgetStyles();
    VSS.register("MyWidget", function () {
        const projectId = VSS.getWebContext().project.id;

        const getQueries = () => {
            return new Promise<any>((resolve) => {
                const workItemTrackingClient = workItemTracking.getClient();
                workItemTrackingClient
                    .getQueries(projectId)
                    .then((queries: any) => {
                        resolve(queries);
                    });
            });
        };

        const runQuery = (id: any) => {
            return new Promise<any>((resolve) => {
                const workItemTrackingClient = workItemTracking.getClient();
                workItemTrackingClient
                    .queryById(id)
                    .then((workItemQueryResult: any) => {
                        resolve(workItemQueryResult);
                    })
            });
        }

        const service: IWorkItemService = {
            getQueries,
            runQuery
        }

        return {
            load: (widgetSettings: any) => {
                const $title = $('h2.title');
                $title.text('Hello World');

                showRootComponent(<MyComponent service={service} />);

                return WidgetHelpers.WidgetStatusHelper.Success();
            }
        }
    });
    VSS.notifyLoadSucceeded();
});

