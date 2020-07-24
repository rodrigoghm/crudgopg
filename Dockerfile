FROM golang:latest

RUN go get github.com/lib/pq

COPY . /go/src

RUN go build -o server /go/src/server.go

EXPOSE 8080

# Run the binary program produced by `go install`
CMD ["/go/src/server"]
