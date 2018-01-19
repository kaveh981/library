interface Book {
    lid;
    bid;
    title;
    isbn;
    lbsid;
}

interface MemberBook {
    mid;
    books: [Book];
}