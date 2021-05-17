import * as React from "react";
import { IWorkItemService } from "./types";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { ScrollableList, IListItemDetails, ListSelection, ListItem } from "azure-devops-ui/List";

type MyComponentProps = {
    service: IWorkItemService;
}

type MyComponentState = {
    isLoading: boolean;
    queries: any[];
}

export default class MyComponent extends React.Component<MyComponentProps, MyComponentState> {
    private selection = new ListSelection(false);

    constructor(props: MyComponentProps) {
        super(props);
        this.state = {
            isLoading: true,
            queries: [],
        };
    }

    public componentDidMount() {
        this.loadQueries();
    }

    private async loadQueries(): Promise<void> {
        const { service } = this.props;
        const queries = await service.getQueries();
        console.log(queries);
        this.setState({
            isLoading: false,
            queries,
        });
    }

    private renderRow = (
        index: number,
        item: any,
        details: IListItemDetails<any>,
        key?: string
    ): JSX.Element => {
        return (
            <ListItem key={key || "list-item" + index} index={index} details={details}>
                <div className="list-example-row flex-row h-scroll-hidden">
                    <div
                        style={{ marginLeft: "10px", padding: "10px 0px" }}
                        className="flex-column h-scroll-hidden"
                    >
                        <span className="text-ellipsis">{item.name}</span>
                    </div>
                </div>
            </ListItem>
        );
    };

    public renderAvailableQueries(): JSX.Element {
        const { queries } = this.state;
        const itemProvider = new ArrayItemProvider(queries);
        return (
            <ScrollableList
                itemProvider={itemProvider}
                renderRow={this.renderRow}
                selection={this.selection}
                width="100%"
            />
        )
    }

    public render(): JSX.Element {
        const { isLoading } = this.state;
        return (
            <div style={{ display: "flex", height: "100px" }}>
                {
                    isLoading ?
                        <Spinner size={SpinnerSize.large} /> :
                        this.renderAvailableQueries()
                }
            </div>
        );
    }
}