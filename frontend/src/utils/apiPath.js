export const API_PATH = {

    AUTH: {
        LOGIN_USER: "/users/login",
        REGISTER_USER: "/users/register"
    },
    COURT: {
        REGISTER_COURT: "/courts/register", // POST
        ALL_COURTS: "/courts/all",
        COURT_ALL_COURTS_PENDING: "/courts/all/pending",
        APPROVED_COURTS: "/courts/all/approved",

        COURTS_BY_USER: "/courts/byuser", // GET
        COURT_BY_ID: (id) => `/courts/${id}`, // GET
        UPDATE_COURT: (id) => `/courts/${id}`,
        DELETE_COURT: (id) => `/courts/${id}` // DELETE
    },
    MatchMaking: {
        CREATE_MATCH: "/matchmaking/create",
        GET_MATCHES: "/matchmaking/all",
        DELETE_MATCH: (id) => `/matchmaking/${id}`
    },
    FAVOURITES: {
        ADD_FAVOURITE: "/favs/add",
        GET_FAVOURITES: "/favs/all",
        REMOVE_FAVOURITE: (id) => `/favs/delete/${id}`
    },
    BOOKINGS: {
        CREATE_BOOKING: "/bookings/create",
        GET_BOOKINGS_BY_USER: "/bookings/mybookings",
        GET_BOOKINGS_BY_COURT: (courtId) => `/bookings/bycourt/${courtId}`,
        CANCEL_BOOKING: (bookingId) => `/bookings/cancel/${bookingId}`




    }


}