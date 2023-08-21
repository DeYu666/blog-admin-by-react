TARGETS := blog-admin-by-react
TARGETS_BASE :=  blog-admin-by-react-base
BUILD := $(shell git rev-parse --short HEAD)
VERSION := $(shell git rev-parse --abbrev-ref HEAD)-$(BUILD)

IMAGE_NAME :=  blog-admin-by-react-service
IMAGE_VERSION := $(IMAGE_NAME):$(VERSION)
REGISTRY_ADDRESS ?= registry.hub.docker.com
IMAGE_FULLNAME := $(REGISTRY_ADDRESS)/deyu666/$(IMAGE_VERSION)
CURRENT_BRANCH_NAME := `git name-rev --name-only HEAD`
BASE_PRE := /it/

all: build

$(TARGETS):
	yarn install
	yarn build

build: $(TARGETS)

image:
	docker build -t $(IMAGE_FULLNAME) . --platform linux/amd64

push-image:
	docker tag $(IMAGE_FULLNAME) deyu666/$(IMAGE_NAME):latest
	docker push deyu666/$(IMAGE_NAME):latest

image-fullname:
	@echo $(IMAGE_FULLNAME)

clean-win:
	rmdir /s/q build

clean:
	rm -rf build

.PHONY: all build build-base image image-fullname image-version clean