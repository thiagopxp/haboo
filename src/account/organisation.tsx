import * as React from "react";
import * as PropTypes from "prop-types";
import { Store, Unsubscribe } from "redux";
import { connect, Dispatch } from "react-redux";
import { IOrganisation } from "@haboo/haboo-sdk";

import { userDispatcher } from "../flux/actions";
import { IUserState, mapProfileToUserState } from "../flux/stores";

import {
    Button,
    Card,
    Layout,
    FormLayout,
    TextField,
    ButtonGroup
} from "@shopify/polaris";

interface IOrganisationProp extends Organisation {
    save(): void;
}

class Organisation extends React.Component<IOrganisationProp, IUserState> {
    public static contextTypes = {
        router: PropTypes.object,
        store: PropTypes.object,
    };

    private router: any;
    private store: Store<IUserState>;  //TODO: use organisation store
    private unsubscribe: Unsubscribe;

    constructor(props: any, context: any) {
        super(props, context);

        this.store = context.store;
        this.router = context.router;
        this.state = this.store.getState();

        this.onsave = this.onsave.bind(this);
    }

    public componentWillMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        });
    }

    public componentWillUnmount() {
        this.unsubscribe();
    }

    public onsave() {
        this.props.save();
    }

    public render() {
        const { firstName, lastName, isFetching } = this.state;
        return (
            <Layout>
                <Layout.AnnotatedSection
                    title="Organisation"
                    description="Tell us a little bit about your organisation"
                >
                    <Card title="Your Organisation" sectioned>
                        <ButtonGroup>
                            <Button disabled={isFetching} onClick={this.onsave}>Save & Proceed</Button>
                        </ButtonGroup>
                    </Card>

                </Layout.AnnotatedSection>
            </Layout>
        );
    }

}

export default connect(mapProfileToUserState, userDispatcher)(Organisation);
