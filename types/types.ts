/* global types */

export type UserInfoType = {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    locale: string | undefined;
    name: string;
    nickname: string | undefined;
    picture?: string | undefined | null;
    sub?: string | null | undefined;
    updated_at?: string | undefined | null;
};

export type Auth0Credentials = {
    clientId: string;
    domain: string;
};
