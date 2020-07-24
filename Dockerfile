FROM golang:latest

RUN go get github.com/lib/pq
RUN MKDIR -p /go/src/crudgopg

COPY . /go/src/crudgopg

RUN go build -o server /go/src/crudgopg/server.go

EXPOSE 8080

# Run the binary program produced by `go install`
CMD ["/go/src/crudgopg/server"]
